async function delet(req, res) {
    try {
        console.log('hii');
        await deleteAppointments();
        res.send('Appointments deletion triggered successfully.');
    } catch (err) {
        res.status(500).send('Error triggering appointments deletion.');
    }
};