class RemoveColumnfromIntelandCompany < ActiveRecord::Migration[6.0]
  def change
    remove_reference :intels, :company, index: true, foreign_key: true
  end
end
