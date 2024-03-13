const {Time} = require('../../utils/helpers/customParser.js');
module.exports = async d => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);

    let [time] = data.inside.splits;

    time = Time.parse(time).ms;

    return {
        code: d.util.setCode(data),
        deleteIn: time
    }
}