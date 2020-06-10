class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :body, null: false
      t.integer :author_id, null: false, index: true
      t.references :messageable, null: false, polymorphic: true

      t.timestamps
    end
  end
end
