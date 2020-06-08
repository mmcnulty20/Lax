class AddDefaultToChannelsTopic < ActiveRecord::Migration[5.2]
  def change
    change_column :channels, :topic, :string, default: "Add a topic"
  end
end
