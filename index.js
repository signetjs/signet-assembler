var signetAssembler = (function () {
    'use strict';
    function hasSubtype(typeDef) {
        return typeDef.subtype && typeDef.subtype.length > 0;
    }

    function buildSubtype(typeDef) {
        return hasSubtype(typeDef) ? '<' + typeDef.subtype.join(';') + '>' : '';
    }

    function prependTypeName(name, typeStr) {
        return typeof name === 'string' ? name + ':' + typeStr : typeStr;
    }

    function addOptionalBrackets(typeStr, isOptional) {
        return isOptional ? '[' + typeStr + ']' : typeStr;
    }

    function getBaseType(typeDef) {
        var typeStr = typeDef.type + buildSubtype(typeDef);
        return addOptionalBrackets(typeStr, typeDef.optional);
    }

    function assembleType(typeDef) {
        var typeStr = getBaseType(typeDef);

        return prependTypeName(typeDef.name, typeStr);
    }

    function buildDependentStr (dependent) {
        return [dependent.left, dependent.operator, dependent.right].join(' ') + ' :: ';
    }

    function assembleTypeList(typeList) {
        var typeListStr = typeList.map(assembleType).join(', ');
        var dependentStr = typeList.dependent === null ? '' : buildDependentStr(typeList.dependent);

        return dependentStr + typeListStr;
    }


    function assembleSignature(typeTree) {
        return typeTree.map(assembleTypeList).join(' => ');
    }

    return {
        assembleSignature: assembleSignature,
        assembleType: assembleType
    };
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = signetAssembler;
}