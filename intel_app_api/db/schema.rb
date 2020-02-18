# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_18_034321) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "business"
    t.string "address"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.string "name"
    t.string "position"
    t.string "email"
    t.integer "number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "company_id"
    t.index ["company_id"], name: "index_contacts_on_company_id"
  end

  create_table "intelcompanies", force: :cascade do |t|
    t.bigint "intel_id", null: false
    t.bigint "company_id", null: false
    t.integer "qty"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_intelcompanies_on_company_id"
    t.index ["intel_id"], name: "index_intelcompanies_on_intel_id"
  end

  create_table "intels", force: :cascade do |t|
    t.string "title"
    t.string "content"
    t.string "source"
    t.bigint "user_id", null: false
    t.string "category"
    t.string "remarks"
    t.date "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "comments", default: [], array: true
    t.integer "readby", default: [], array: true
    t.string "tags", default: [], array: true
    t.index ["user_id"], name: "index_intels_on_user_id"
  end

  create_table "suggestedintels", force: :cascade do |t|
    t.string "title"
    t.string "content"
    t.string "source"
    t.string "tags"
    t.bigint "user_id", null: false
    t.string "category"
    t.date "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_suggestedintels_on_user_id"
  end

  create_table "user_trackers", force: :cascade do |t|
    t.integer "unreadCount"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_user_trackers_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "contacts", "companies"
  add_foreign_key "intelcompanies", "companies"
  add_foreign_key "intelcompanies", "intels"
  add_foreign_key "intels", "users"
  add_foreign_key "suggestedintels", "users"
  add_foreign_key "user_trackers", "users"
end
