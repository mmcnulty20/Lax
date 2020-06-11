json.extract! message, :id, :author_id, :body, :created_at
json.edited message.created_at != message.updated_at