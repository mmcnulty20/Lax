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

    validates :username, presence: { message: "This is required — you’ll need to enter a name." }
    validates :email, presence: { message: "This is required — you’ll need to enter an email." }
    validates :email, uniqueness: { message: "That email is already in use." }
    validates :session_token, presence: true, uniqueness: true
    validates :avatar_image, :password_digest, null: false
    validates :password, presence: { message: "This is required — you’ll need to enter a password." }, on: :create
    validates :password, length: {
        minimum: 6,
        maximum: 72,
        allow_nil: true,
        too_short: "Your password must be at least 6 characters long.",
        too_long: "Your password can’t be more than 72 characters long."
    }

    attr_reader :password

    has_many :admined_channels,
        class_name: :Channel,
        foreign_key: :admin_id

    has_many :memberships,
        dependent: :destroy

    has_many :joined_channels,
        through: :memberships,
        source: :joinable,
        source_type: "Channel"

    has_many :authored_messages,
        class_name: :Message,
        foreign_key: :author_id,
        dependent: :destroy

    has_many :direct_messages,
        through: :memberships,
        source: :joinable,
        source_type: "DirectMessage"

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(@password)
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
