class ChangeTagstoArray < ActiveRecord::Migration[6.0]
  def change
    remove_column :intels, :tags
    add_column :intels, :tags, :string, array: true, default: []
  end
end
