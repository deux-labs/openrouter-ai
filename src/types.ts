type TextContent = {
    type: 'text';
    text: string;
}

type ImageContentPart = {
    type: 'image_url',
    image_url: {
        url: string; // URL or base64 encoded image data
        detail?: string;  // Optional, defaults to 'auto'
    }
}

type ContentPart = TextContent | ImageContentPart;

type Message = {
    role: 'user' | 'assistant' | 'system'
    content: string | ContentPart[];
    name?: string
} | {
    role: 'tool',
    content: string;
    tool_call_id: string;
    name?: string;
}

type FunctionDescription = {
    description?: string
    name: string;
    parameters: object;
}

type Tool = {
    type: 'function',
    function: FunctionDescription
}

type ToolChoice = 'none' | 'auto' | {
    type: 'function',
    function: {
    name: string;
}}

type Request = {
    messages?:  
}