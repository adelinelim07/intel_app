class Intel < ApplicationRecord
  # has_many :intelcompanies
  # has_many :companies, through: :intelcompanies, dependent: :destroy
  
  belongs_to :user
end
