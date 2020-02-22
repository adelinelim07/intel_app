class Deleteintelcompanies < ActiveRecord::Migration[6.0]
  def change
    drop_table :intelcompanies
  end
end
