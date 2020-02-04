# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Contact.create(
    name: "TEST CONTACT NAME",
    position: "TEST CONTACT POS",
    company: "TEST CONTACT COMPANY",
    email: "TEST CONTACT EMAIL",
    number: 6597211
)

Intel.create(
    title: "TEST TITLE",
    content: "TEST CONTENT",
    source: "TEST SOURCE",
    tags: "TEST TAG",
    contact_id: 1,
    user_id: 1,
    #type: "test type yoohoooo",
    remarks: "TEST REMARK",
    date: "TEST DATE"
)