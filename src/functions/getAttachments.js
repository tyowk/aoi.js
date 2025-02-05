/**
 * @param {import("..").Data} d
 */
module.exports = async d => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);

    const [channelID, messageID, index = 1, option = 'url', sep = ', '] = data.inside.splits;

    const channel = await d.util.getChannel(d, channelID);
    if (!channel) return d.aoiError.fnError(d, 'channel', {inside: data.inside});

    const message = await d.util.getMessage(channel, messageID);
    if (!message) return d.aoiError.fnError(d, 'message', {inside: data.inside});

    const attachments = [...message.attachments.values()];
    if (!attachments.length) return d.aoiError.fnError(d, 'custom', {}, "Message Doesn't Have Any Attachments");

    if (!isNaN(parseInt(index))) {
        data.result = attachments[index - 1][option];
    } else {
        data.result = attachments.map(x => x?.[option])?.join(sep);
    };

    return {
        code: d.util.setCode(data)
    }
}
