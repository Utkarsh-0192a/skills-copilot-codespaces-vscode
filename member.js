function skillsMember() {
  // load the member's skills from the database
  var skills = db.getSkills();
  // render the skills
  renderSkills(skills);
}