class CreateIntels < ActiveRecord::Migration[6.0]
  def change
    create_table :intels do |t|
      t.string :title
      t.string :content
      t.string :source
      t.string :tags
      t.references :contact, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :type
      t.string :remarks
      t.date :date

      t.timestamps
    end
  end
end
