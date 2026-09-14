const roleBasedAuth = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    message: "You do not have permission to perform this action"
                });
            }

            next();

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    };
};

export default roleBasedAuth;