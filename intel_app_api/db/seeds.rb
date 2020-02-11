# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Company.create(
    name: "Singapore Airlines",
    business: "Airline",
    address: "Changi Airport",
)


Contact.create(
    name: "Goh",
    position: "CEO",
    email: "goh@sia.com.sg",
    number: 659125,
    company_id: 1
)
