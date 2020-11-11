import { Request, Response, NextFunction } from 'express';


const catchErrors = (fn) => {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch((err) => {
      //Validation Errors
      if (typeof err === "string") {
        res.status(400).json({
          message: err,
        });
      } else {
        next(err);
      }
    });
  };
};

const mongoseErrors = (err, req: Request, res: Response, next: NextFunction) => {
  if (!err.errors) return next(err);
  const errorKeys = Object.keys(err.errors);
  let message = "";
  errorKeys.forEach((key) => (message += err.errors[key].message + ", "));

  message = message.substr(0, message.length - 2);

  res.status(400).json({
    message,
  });
};

const developmentErrors = (err, req: Request, res: Response, next: NextFunction) => {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };

  res.status(err.status || 500).json(errorDetails); // send JSON back
};

const productionErrors = (err, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    error: "Internal Server Error",
  }); // send JSON back
};

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "Route not found",
  });
};

export { catchErrors, developmentErrors, mongoseErrors, notFound, productionErrors }