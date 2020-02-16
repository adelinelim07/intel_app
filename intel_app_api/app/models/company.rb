class Company < ApplicationRecord
    has_many :intelcompanies
    has_many :intels, through: :intelcompanies, dependent: :destroy

end
