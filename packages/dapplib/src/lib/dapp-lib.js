'use strict';
const Blockchain = require( './blockchain');
const dappConfig = require( '../dapp-config.json');
const ClipboardJS = require( 'clipboard');
const SvgIcons = require( './components/svg-icons');
const BN = require('bn.js'); // Required for injected code

///+import

module.exports = class DappLib {

      /*>>>>>>>>>>>>>>>>>>>>>>>>>>> EXAMPLES: HELLO DEV  <<<<<<<<<<<<<<<<<<<<<<<<<<*/
    
        static async countHellos(data) {
            let config = DappLib.getConfig();

            let result = await Blockchain.get({ config }, 'greeting');

            return {
                type: DappLib.DAPP_RESULT_BIG_NUMBER,
                label: 'Get Hello Count',
                result: result.callData.numGreets
            }
        }
        
        static async sayHello() {

            let config = DappLib.getConfig();

            let result = await Blockchain.put({ config }, 'greeting', Buffer.alloc(0));
            return {
                type: DappLib.DAPP_RESULT_OBJECT,
                label: 'Transaction Result',
                result                
            }
        }



/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DAPP LIBRARY  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    static get DAPP_STATE_CONTRACT() {
        return 'dappStateContract'
    }
    static get DAPP_CONTRACT() {
        return 'dappContract'
    }

    static get DAPP_STATE_CONTRACT_WS() {
        return 'dappStateContractWs'
    }
    static get DAPP_CONTRACT_WS() {
        return 'dappContractWs'
    }

    static get DAPP_RESULT_BIG_NUMBER() {
        return 'big-number'
    }

    static get DAPP_RESULT_ACCOUNT() {
        return 'account'
    }

    static get DAPP_RESULT_TX_HASH() {
        return 'tx-hash'
    }

    static get DAPP_RESULT_IPFS_HASH_ARRAY() {
        return 'ipfs-hash-array'
    }

    static get DAPP_RESULT_SIA_HASH_ARRAY() {
        return 'sia-hash-array'
    }

    static get DAPP_RESULT_ARRAY() {
        return 'array'
    }

    static get DAPP_RESULT_OBJECT() {
        return 'object'
    }

    static get DAPP_RESULT_ERROR() {
        return 'error'
    }

    static get SVG_ICONS() {
        return SvgIcons;
    }

    static async addEventHandler(contract, event, params, callback) {
            Blockchain.handleEvent({
                config: DappLib.getConfig(),
                contract: contract,
                params: params || {}
            }, 
            event, 
            (error, result) => {
                                if (error) {
                                    callback({
                                        event: event,
                                        type: DappLib.DAPP_RESULT_ERROR,
                                        label: 'Error Message',
                                        result: error
                                    });    
                                } else {
                                    callback({
                                        event: event,
                                        type: DappLib.DAPP_RESULT_OBJECT,
                                        label: 'Event ' + event,
                                        result: DappLib.getObjectNamedProperties(result)
                                    });    
                                }
                            }
            );
    }

    static getTransactionHash(t) {
        if (!t) { return ''; }
        let value = '';
        if (typeof t === 'string') {                
            value = t;
        } else if (typeof t === 'object') {    
            if (t.hasOwnProperty('transactionHash')) {
                    value = t.transactionHash;       // Ethereum                
            } else {
                value = JSON.stringify(t);
            }
        }
        return value;
    }

    static formatHint(hint) {
        if (hint) {
            return `<p class="mt-3 grey-text"><strong>Hint:</strong> ${hint}</p>`;
        } else {
            return '';
        }
    }

    static formatNumber(n) {
        var parts = n.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return `<strong class="p-1 blue-grey-text number copy-target" style="font-size:1.1rem;" title="${n}">${parts.join(".")}</strong>`;
    }

    static formatAccount(a) {
        return `<strong class="green accent-1 p-1 blue-grey-text number copy-target" title="${a}">${DappLib.toCondensed(a, 6, 4)}</strong>${ DappLib.addClippy(a)}`;
    }

    static formatTxHash(a) {
        let value = DappLib.getTransactionHash(a);
        return `<strong class="teal lighten-5 p-1 blue-grey-text number copy-target" title="${value}">${DappLib.toCondensed(value, 6, 4)}</strong>${ DappLib.addClippy(value)}`;
    }

    static formatBoolean(a) {
        return (a ? 'YES' : 'NO');
    }

    static formatText(a, copyText) {
        if (!a) { return; }
        if (a.startsWith('<')) {
            return a;
        }
        return `<span class="copy-target" title="${copyText ? copyText : a}">${a}</span>${DappLib.addClippy(copyText ? copyText : a)}`;
    }

    static formatStrong(a) {
        return `<strong>${a}</strong>`;
    }

    static formatPlain(a) {
        return a;
    }

    static formatObject(a) {
        let data = [];
        let labels = [ 'Item', 'Value' ];
        let keys = [ 'item', 'value' ];
        let formatters = [ 'Strong', 'Text-20-5' ];
        let reg = new RegExp('^\\d+$'); // only digits
        for(let key in a) {
            if (!reg.test(key)) {
                data.push({
                    item: key.substr(0,1).toUpperCase() + key.substr(1),
                    value: a[key]
                });
            }
        }
        return DappLib.formatArray(data, formatters, labels, keys);
    }

    static formatArray(h, dataFormatters, dataLabels, dataKeys) {

        let output = '<table class="table table-striped">';

        if (dataLabels) {
            output += '<thead><tr>';
            for(let d=0; d<dataLabels.length; d++) {
                output += `<th scope="col">${dataLabels[d]}</th>`;
            }    
            output += '</tr></thead>';
        }
        output += '<tbody>';
        h.map((item) => {
            output += '<tr>';
            for(let d=0; d<dataFormatters.length; d++) {
                let text = String(dataKeys && dataKeys[d] ? item[dataKeys[d]] : item);
                let copyText =  dataKeys && dataKeys[d] ? item[dataKeys[d]] : item;
                if (text.startsWith('<')) {
                    output += (d == 0 ? '<th scope="row">' : '<td>') + text + (d == 0 ? '</th>' : '</td>');
                } else {
                    let formatter = 'format' + dataFormatters[d];
                    if (formatter.startsWith('formatText')) {
                        let formatterFrags = formatter.split('-');
                        if (formatterFrags.length === 3) {
                            text = DappLib.toCondensed(text, Number(formatterFrags[1]), Number(formatterFrags[2]));
                        } else if (formatterFrags.length === 2) {
                            text = DappLib.toCondensed(text, Number(formatterFrags[1]));
                        }
                        formatter = formatterFrags[0];    
                    }
                    output += (d == 0 ? '<th scope="row">' : '<td>') + DappLib[formatter](text, copyText) + (d == 0 ? '</th>' : '</td>');                        
                }
            }    
            output += '</tr>';
        })
        output += '</tbody></table>';
        return output;
    }

    static getFormattedResultNode(retVal, key) {

        let returnKey = 'result';
        if (key && (key !== null) && (key !== 'null') && (typeof(key) === 'string')) {
            returnKey = key;
        }
        let formatted = '';
        switch (retVal.type) {
            case DappLib.DAPP_RESULT_BIG_NUMBER:
                formatted = DappLib.formatNumber(retVal[returnKey].toString(10));
                break;
            case DappLib.DAPP_RESULT_TX_HASH:
                formatted = DappLib.formatTxHash(retVal[returnKey]);
                break;
            case DappLib.DAPP_RESULT_ACCOUNT:
                formatted = DappLib.formatAccount(retVal[returnKey]);
                break;
            case DappLib.DAPP_RESULT_BOOLEAN:
                formatted = DappLib.formatBoolean(retVal[returnKey]);
                break;
            case DappLib.DAPP_RESULT_IPFS_HASH_ARRAY:
                formatted = DappLib.formatArray(
                    retVal[returnKey],
                    ['TxHash', 'IpfsHash', 'Text-10-5'],
                    ['Transaction', 'IPFS URL', 'Doc Id'],
                    ['transactionHash', 'ipfsHash', 'docId']
                );
                break;
            case DappLib.DAPP_RESULT_SIA_HASH_ARRAY:
                formatted = DappLib.formatArray(
                    retVal[returnKey],
                    ['TxHash', 'SiaHash', 'Text-10-5'],
                    ['Transaction', 'Sia URL', 'Doc Id'],
                    ['transactionHash', 'docId', 'docId']
                );
                break;
            case DappLib.DAPP_RESULT_ARRAY:
                formatted = DappLib.formatArray(
                    retVal[returnKey],
                    retVal.formatter ? retVal.formatter : ['Text'],
                    null,
                    null
                );
                break;
            case DappLib.DAPP_RESULT_OBJECT:
                formatted = DappLib.formatObject(retVal[returnKey]);
                break;
            default:
                formatted = retVal[returnKey];
                break;
        }

        let resultNode = document.createElement('div');
        resultNode.className = `note ${retVal.type === DappLib.DAPP_RESULT_ERROR ? 'bg-red-400' : 'bg-green-400'} m-3 p-3`; 
        let closeMarkup = '<div class="float-right" onclick="this.parentNode.parentNode.removeChild(this.parentNode)" title="Dismiss" class="text-right mb-1 mr-2" style="cursor:pointer;">X</div>';    
        resultNode.innerHTML = closeMarkup + `${retVal.type === DappLib.DAPP_RESULT_ERROR ? '☹️' : '👍️'} ` + (Array.isArray(retVal[returnKey]) ? 'Result' : retVal.label) + ': ' + formatted + DappLib.formatHint(retVal.hint);
        // Wire-up clipboard copy
        new ClipboardJS('.copy-target', {
            text: function (trigger) {
                return trigger.getAttribute('data-copy');
            }
        });

        return resultNode;
    }

    static getObjectNamedProperties(a) {
        let reg = new RegExp('^\\d+$'); // only digits
        let newObj = {};
        for(let key in a) {
            if (!reg.test(key)) {
                newObj[key] = a[key];
            }
        }
        return newObj;
    }
    
    static addClippy(data) {
        let icon = SvgIcons.clippy;
        return icon.replace('<svg ', `<svg data-copy="${data}" `)
    }

    static getAccounts() {
        let accounts = dappConfig.accounts;
        return accounts;
    }

    static fromAscii(str, padding) {

        if (str.startsWith('0x') || !padding) {
            return str;
        }

        if (str.length > padding) {
            str = str.substr(0, padding);
        }

        var hex = '0x';
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            var n = code.toString(16);
            hex += n.length < 2 ? '0' + n : n;
        }
        return hex + '0'.repeat(padding*2 - hex.length + 2);
    };
    
    static toAscii(hex) {
        var str = '',
            i = 0,
            l = hex.length;
        if (hex.substring(0, 2) === '0x') {
            i = 2;
        }
        for (; i < l; i+=2) {
            var code = parseInt(hex.substr(i, 2), 16);
            if (code === 0) continue; // this is added
            str += String.fromCharCode(code);
        }
        return str;
    };

    static toCondensed(s, begin, end) {
        if (!s) { return; }
        if (s.length && s.length <= begin + end) {
            return s;
        } else {
            if (end) {
                return `${s.substr(0, begin)}...${s.substr(s.length-end, end)}`;
            } else {
                return `${s.substr(0, begin)}...`;
            }
        }
    }

    // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    static getUniqueId() {
        return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    static getConfig() {
        return dappConfig;
    }

    // Return value of this function is used to dynamically re-define getConfig()
    // for use during testing. With this approach, even though getConfig() is static
    // it returns the correct contract addresses as its definition is re-written
    // before each test run. Look for the following line in test scripts to see it done:
    //  DappLib.getConfig = Function(`return ${ JSON.stringify(DappLib.getTestConfig(testDappStateContract, testDappContract, testAccounts))}`);
    static getTestConfig(testDappStateContract, testDappContract, testAccounts) {

        return Object.assign(
            {}, 
            dappConfig,
            {
                dappStateContractAddress: testDappStateContract.address,
                dappContractAddress: testDappContract.address,
                accounts: testAccounts,
                owner: testAccounts[0],
                admins: [
                    testAccounts[1],
                    testAccounts[2],
                    testAccounts[3]
                ],
                users: [
                    testAccounts[4],
                    testAccounts[5],
                    testAccounts[6],
                    testAccounts[7],
                    testAccounts[8]
                ]
///+test
            }
        );
    }

}