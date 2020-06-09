# == Schema Information
#
# Table name: memberships
#
#  id            :bigint           not null, primary key
#  user_id       :integer          not null
#  joinable_type :string           not null
#  joinable_id   :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Membership < ApplicationRecord
    validates :user_id, :joinable_type, :joinable_id, presence: true
    validates :user_id, uniqueness: { scope: [:joinable_type, :joinable_id] }

    belongs_to :user

    belongs_to :joinable,
        polymorphic: true
end
