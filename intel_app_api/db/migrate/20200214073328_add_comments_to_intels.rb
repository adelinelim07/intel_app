class AddCommentsToIntels < ActiveRecord::Migration[6.0]
  def change
    add_column :intels, :comments, :text, array:true, default: []
  end
end
