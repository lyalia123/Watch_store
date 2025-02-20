const Watch = require('../models/Watch');

exports.listWatches = async (req, res) => {
    try {
      if (!req.session || !req.session.user) {
        return res.redirect('/login');
      }
  
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
  
      const watches = await Watch.find().skip(skip).limit(limit);
      const totalWatches = await Watch.countDocuments();
  
      const successMessage = req.query.successMessage || null;
      const errorMessage = req.query.errorMessage || null;
  
      res.render('home', {
        watches,
        user: req.session.user,
        currentPage: page,
        totalPages: Math.ceil(totalWatches / limit),
        successMessage,
        errorMessage,
      });
    } catch (error) {
      console.error('Failed to load watches:', error);
      res.status(500).send('Server Error');
    }
};
  

exports.addWatch = async (req, res) => {
    try {
      if (!req.session || !req.session.user) {
        return res.status(401).send('Unauthorized. Please login first.');
      }
      if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access Denied. Only admin can add watches.');
      }
  
      await Watch.create(req.body);
      res.redirect('/watches/home?successMessage=Watch successfully added');
    } catch (error) {
      console.error(error);
      res.redirect('/watches/home?errorMessage=Failed to add watch');
    }
};

exports.updateWatch = async (req, res) => {
    try {
      console.log('Session user in updateWatch:', req.session.user);
  
      if (!req.session || !req.session.user) {
        return res.status(401).send('Unauthorized. Please login first.');
      }
  
      if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access Denied. Only admin can update watches.');
      }
  
      console.log('Request body:', req.body);
  
      const watch = await Watch.findById(req.params.id);
      if (!watch) {
        return res.status(404).send('Watch not found');
      }
  
      await Watch.findByIdAndUpdate(req.params.id, req.body);
      console.log('Watch updated:', req.params.id);
  
      res.redirect('/watches/home?successMessage=Watch successfully updated');
    } catch (error) {
      console.error('Failed to update watch:', error);
      res.redirect('/watches/home?errorMessage=Failed to update watch');
    }
};
   
exports.deleteWatch = async (req, res) => {
    try {
      if (!req.session || !req.session.user) {
        return res.status(401).send('Unauthorized. Please login first.');
      }
      if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access Denied. Only admin can delete watches.');
      }
  
      const watch = await Watch.findById(req.params.id);
      if (!watch) return res.status(404).send('Watch not found');
  
      await Watch.findByIdAndDelete(req.params.id);
      res.redirect('/watches/home?successMessage=Watch successfully deleted');
    } catch (error) {
      console.error(error);
      res.redirect('/watches/home?errorMessage=Failed to delete watch');
    }
};
  

