# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  avatar_image    :string           default("/"), not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    before_validation :ensure_session_token

    validates :username, :email, :session_token, presence: true, uniqueness: true
    validates :avatar_image, :password_digest, null: false
    validates :password, length: {minimum: 6, allow_nil: true }

    attr_reader :password

    def password=(password)
        @password = password
    end

    def self.generate_session_token
        SecureRandom.urlsafe_base64(16)
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return unless user
        user.is_password?(password) ? user : nil
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        update!(session_token: User.generate_session_token)
        session_token
    end

    private
    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end
end
