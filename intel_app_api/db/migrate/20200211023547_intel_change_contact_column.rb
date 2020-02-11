class IntelChangeContactColumn < ActiveRecord::Migration[6.0]
  def change
    remove_reference :intels, :contact, index: true, foreign_key: true
    add_reference :intels, :company, index: true
    add_foreign_key :intels, :companies
  end
end
