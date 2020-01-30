json.extract! contact, :id, :name, :position, :company, :email, :number, :created_at, :updated_at
json.url contact_url(contact, format: :json)
