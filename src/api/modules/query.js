const testData = { message: 'testing data' };

const controllers = {
	createOne(model) {
		return Promise.resolve(testData);
	},
	updateOne(docToUpdate, update) {
		return Promise.resolve(testData);
	},
	deleteOne(docToDelete) {
		return Promise.resolve(testData);
	},
	getOne(docToGet) {
		return Promise.resolve(testData);
	},
	getAll(model) {
		return Promise.resolve(testData);
	},
	findByParam(model, id) {
		return Promise.resolve(testData);
	},
};

const createOne = model => (req, res, next) => {
	return controllers
		.createOne(model)
		.then(doc => res.status(201).json(doc))
		.catch(error => next(error));
};

const updateOne = model => (req, res, next) => {
	const docToUpdate = req.docFromId;
	const update = req.body;

	return controllers
		.updateOne(docToUpdate, update)
		.then(doc => res.status(201).json(doc))
		.catch(error => next(error));
};

const deleteOne = model => (req, res, next) => {
	return controllers
		.deleteOne(req.docFromId)
		.then(doc => res.status(200).json(doc))
		.catch(error => next(error));
};

const getOne = model => (req, res, next) => {
	return controllers
		.getOne(req.docFromId)
		.then(doc => res.status(200).json(doc))
		.catch(error => next(error));
};

const getAll = model => (req, res, next) => {
	return controllers
		.getAll(model)
		.then(doc => res.status(200).json(doc))
		.catch(error => next(error));
};

const findByParam = model => (req, res, next, id) => {
	return controllers
		.findByParam(model, id)
		.then(doc => {
			if (!doc) {
				next(new Error('Not found document.'));
			} else {
				req.docFromId = doc;
				next();
			}
		})
		.catch(error => next(error));
};

export const generateControllers = (model, overrides = {}) => {
	const defaults = {
		createOne: createOne(model),
		updateOne: updateOne(model),
		deleteOne: deleteOne(model),
		getOne: getOne(model),
		getAll: getAll(model),
		findByParam: findByParam(model),
	};

	return { ...defaults, ...overrides };
};
