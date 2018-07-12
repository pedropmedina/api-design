import { merge } from 'lodash';

const testData = { message: 'testing data' };

const controllers = {
	createOne(model, body) {
		return model.create(body);
	},
	updateOne(docToUpdate, update) {
		merge(docToUpdate, update);
		return docToUpdate.save();
	},
	deleteOne(docToDelete) {
		return docToDelete.remove();
	},
	getOne(docToGet) {
		return Promise.resolve(docToGet);
	},
	getAll(model) {
		return model.find({}).exec();
	},
	findByParam(model, id) {
		return model.findById(id).exec();
	},
};

const createOne = model => (req, res, next) => {
	return controllers
		.createOne(model, req.body)
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
