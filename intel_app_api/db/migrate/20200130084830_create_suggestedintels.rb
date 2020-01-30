class CreateSuggestedintels < ActiveRecord::Migration[6.0]
  def change
    create_table :suggestedintels do |t|
      t.string :title
      t.string :content
      t.string :source
      t.string :tags
      t.references :user, null: false, foreign_key: true
      t.string :type
      t.date :date

      t.timestamps
    end
  end
end
