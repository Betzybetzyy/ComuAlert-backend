export const RoleValidation = (req, res, next) => {
  try {
    const { Rol } = req?.body?.usuario;
    if (Rol !== "ADMIN") {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized",
        });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};
