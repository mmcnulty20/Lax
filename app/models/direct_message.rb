class DirectMessage < ApplicationRecord

    has_many :memberships,
        as: :joinable

    has_many :members,
        through: :memberships,
        source: :user
    
    has_many :messages,
        as: :messageable
end
