export function translateRole(role: UserAPIRole | undefined): string {
    switch (role) {
        case 'ADMIN':
            return 'ADMIN';
        case 'CLIENT':
            return 'CLIENTE';
        case 'TECHNICIAN':
            return 'TÉCNICO';
        default:
            return 'Desconhecido';
    }
}