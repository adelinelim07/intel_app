class ChangeLinkTable < ActiveRecord::Migration[6.0]
  def change
    rename_table :intel_companies, :intelcompanies
  end
end
