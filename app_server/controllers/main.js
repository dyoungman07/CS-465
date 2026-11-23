const main = (req, res) => {
    res.render('index', {
        title: 'Travlr Getaways',
        home: true
    });
};

module.exports = {
    main
};