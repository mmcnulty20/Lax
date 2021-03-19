# == Schema Information
#
# Table name: direct_messages
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class DirectMessage < ApplicationRecord

    has_many :memberships,
        as: :joinable

    has_many :members,
        through: :memberships,
        source: :user
    
    has_many :messages,
        as: :messageable
end