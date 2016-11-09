var signetAssembler = (function () {
    'use strict';
    function hasSubtype(typeDef) {
        return typeDef.subtype && typeDef.subtype.length > 0;
    }

    function buildSubtype(typeDef) {
        return hasSubtype(typeDef) ? '<' + typeDef.subtype.join(';') + '>' : '';
    }

    function assembleType(typeDef) {
        var typeStr = typeDef.type + buildSubtype(typeDef);

        return typeDef.optional ? '[' + typeStr + ']' : typeStr;
    }

    function assembleTypeList(typeList) {
        return typeList.map(assembleType).join(', ');
    }

    function assembleSignature(typeTree) {
        return typeTree.map(assembleTypeList).join(' => ');
    }

    return {
        assembleSignature: assembleSignature,
        assembleType: assembleType
    };
})();

if (typeof module !== 'udefined' && typeof module.exports !== 'undefined') {
    module.exports = signetAssembler;
}