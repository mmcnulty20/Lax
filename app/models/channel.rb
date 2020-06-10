# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  topic      :string           default("Add a topic"), not null
#  admin_id   :integer          not null
#  is_private :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Channel < ApplicationRecord
    validates :name, uniqueness: true
    validates :topic, :name, :admin_id, presence: true
    before_validation :ensure_topic
    
    has_many :memberships,
        as: :joinable,
        dependent: :destroy

    belongs_to :admin,
        class_name: :User,
        foreign_key: :admin_id

    has_many :members,
        through: :memberships,
        source: :user
    
    has_many :messages,
        as: :messageable,
        dependent: :destroy

    private
    def ensure_topic
        self.topic ||= "Add a topic."
    end
end
