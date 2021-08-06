export interface Blog {
    blogId: string;
    userName: string;
    title: string;
    content: string;
    createdOn: string;
    authdata?: string;
    highlighted?: boolean;
    hovered?: boolean;
}
