import { AutoCodingInstructions } from "iqbspecs-coding-service/interfaces/iqb.interfaces";
export declare class AutocoderService {
    readonly schema: {
        $id: string;
        $schema: string;
        title: string;
        description: string;
        type: string;
        properties: {
            version: {
                type: string;
                description: string;
                pattern: string;
                examples: string[];
            };
            variableCodings: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        id: {
                            type: string;
                            description: string;
                            pattern: string;
                        };
                        alias: {
                            type: string;
                            description: string;
                            pattern: string;
                        };
                        label: {
                            type: string;
                            description: string;
                        };
                        sourceType: {
                            type: string;
                            description: string;
                            enum: string[];
                        };
                        sourceParameters: {
                            type: string;
                            description: string;
                            properties: {
                                solverExpression: {
                                    type: string;
                                    description: string;
                                    examples: string[];
                                };
                                processing: {
                                    type: string;
                                    description: string;
                                    items: {
                                        type: string;
                                        enum: string[];
                                    };
                                };
                            };
                        };
                        deriveSources: {
                            type: string;
                            items: {
                                type: string;
                                pattern: string;
                            };
                        };
                        processing: {
                            type: string;
                            description: string;
                            items: {
                                type: string;
                                enum: string[];
                            };
                        };
                        fragmenting: {
                            type: string;
                            description: string;
                        };
                        manualInstruction: {
                            type: string;
                            description: string;
                        };
                        codeModel: {
                            type: string;
                            enum: string[];
                            description: string;
                        };
                        page: {
                            type: string;
                            description: string;
                        };
                        codes: {
                            type: string;
                            items: {
                                type: string;
                                properties: {
                                    id: {
                                        oneOf: ({
                                            type: string;
                                            enum?: undefined;
                                        } | {
                                            type: string;
                                            enum: string[];
                                        })[];
                                        description: string;
                                    };
                                    type: {
                                        type: string;
                                        enum: string[];
                                        description: string;
                                    };
                                    label: {
                                        type: string;
                                    };
                                    score: {
                                        type: string;
                                    };
                                    manualInstruction: {
                                        type: string;
                                        description: string;
                                    };
                                    ruleSetOperatorAnd: {
                                        type: string;
                                        description: string;
                                    };
                                    ruleSets: {
                                        type: string;
                                        items: {
                                            type: string;
                                            properties: {
                                                valueArrayPos: {
                                                    anyOf: ({
                                                        type: string;
                                                        description: string;
                                                        enum?: undefined;
                                                    } | {
                                                        type: string;
                                                        description: string;
                                                        enum: string[];
                                                    })[];
                                                };
                                                ruleOperatorAnd: {
                                                    type: string;
                                                    description: string;
                                                };
                                                rules: {
                                                    type: string;
                                                    items: {
                                                        type: string;
                                                        properties: {
                                                            fragment: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            method: {
                                                                type: string;
                                                                description: string;
                                                                enum: string[];
                                                            };
                                                            parameters: {
                                                                type: string;
                                                                description: string;
                                                                items: {
                                                                    type: string;
                                                                };
                                                            };
                                                        };
                                                        required: string[];
                                                    };
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                    required: string[];
                };
            };
        };
        required: string[];
    };
    private readonly validator;
    validateScheme(codingScheme: unknown): codingScheme is AutoCodingInstructions;
    getEmptyScheme(): AutoCodingInstructions;
}
