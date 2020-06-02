# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

users = User.create([
    {username: "test", email: "test@user.com", password: "password"},
    {username: "test2", email: "test2@user.com", password: "password"},
    {username: "test3", email: "test3@user.com", password: "password"}
])