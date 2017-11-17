const logger = require('logtown')('QnasDialog');
const Dialog = require('./dialog');

/**
 * The qnas dialog answers the user's question or displays several alternatives.
 * @extends Dialog
 */
class QnasDialog extends Dialog {
  /**
   * @constructor
   * @param {Object} config - the bot config
   * @param {class} brain - the bot brain
   */
  constructor(config, brain) {
    // TODO: this is a hack for avoiding recording this dialog in lastDialog
    super(config, brain, 1);
  }

  /**
   * Executes the dialog.
   * @async
   * @param {Adapter} adapter - the adapter
   * @param {String} userId the user id
   * @param {Object[]} messageEntities - the message entities
   * @returns {Promise.<String>} the new dialog status
   */
  async execute(adapter, userId, messageEntities) {
    logger.debug('execute', userId, messageEntities);
    const qnas = messageEntities[0].value;
    logger.debug('execute: qnas', qnas);
    if (qnas.length === 1) {
      await this.display(adapter, userId, 'answer', { answer: qnas[0].answer });
      return this.STATUS_COMPLETED;
    }
    await this.display(adapter, userId, 'questions', { qnas });
    return this.STATUS_READY;
  }
}

module.exports = QnasDialog;
