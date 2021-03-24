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

    def self.group_exists?(ids)
        DirectMessage.joins(:memberships)
            .group(:id)
            .having('ARRAY[?] = ARRAY_AGG(memberships.user_id ORDER BY memberships.user_id)', ids.map(&:to_i).sort)
            .first # Should never have more than one result
    end
end