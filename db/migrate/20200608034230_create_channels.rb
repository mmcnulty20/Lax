class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :topic, null: false
      t.integer :admin_id, null: false, index: true
      t.boolean :is_private, null: false, default: false
      t.timestamps
    end
  end
end
