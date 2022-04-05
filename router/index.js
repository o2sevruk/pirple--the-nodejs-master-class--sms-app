const handlers = {
  sample: (data, cb) => cb(406, { name: "sample handler" }),
  notFounded: (data, cb) => cb(404),
};

const router = {
  sample: handlers.sample,
};

export {handlers, router};
