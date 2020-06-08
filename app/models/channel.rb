# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  topic      :string           not null
#  admin_id   :integer          not null
#  is_private :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Channel < ApplicationRecord
    validates :name, uniqueness: true
    validates :topic, :name, :admin_id, presence: true
    
    has_many :memberships,
        as: :joinable

    belongs_to :admin,
        class_name: :User,
        foreign_key: :admin_id

    has_many :members,
        through: :memberships,
        source: :user
end
