class ContactChangeCompanyColumn < ActiveRecord::Migration[6.0]
  def change
    remove_column :contacts, :company, :string
    add_reference :contacts, :company, index: true
    add_foreign_key :contacts, :companies
  end
end
