class CreateMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :memberships do |t|
      t.integer :user_id, null: false, index: true
      t.references :joinable, null: false, polymorphic: true, index: true

      t.timestamps
    end
  end
end
