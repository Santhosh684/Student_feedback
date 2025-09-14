// Get profile
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

// Update profile
router.put("/me", protect, async (req, res) => {
  req.user.name = req.body.name || req.user.name;
  req.user.phone = req.body.phone || req.user.phone;
  req.user.dob = req.body.dob || req.user.dob;
  req.user.address = req.body.address || req.user.address;
  await req.user.save();
  res.json(req.user);
});

// Change password
router.put("/change-password", protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!(await req.user.matchPassword(currentPassword))) {
    return res.status(400).json({ message: "Current password wrong" });
  }
  req.user.password = newPassword;
  await req.user.save();
  res.json({ message: "Password updated" });
});
