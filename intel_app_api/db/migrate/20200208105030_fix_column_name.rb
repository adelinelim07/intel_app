class FixColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :intels, :type, :category
    rename_column :suggestedintels, :type, :category
  end
end
