class CreateIntelCompanies < ActiveRecord::Migration[6.0]
  def change
    create_table :intel_companies do |t|
      t.references :intel, null: false, foreign_key: true
      t.references :company, null: false, foreign_key: true
      t.integer :qty

      t.timestamps
    end
  end
end
