export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModalAction(type, contentPath) {
  return {
    type,
    payload: {
      open: true,
      contentPath
    }
  }
}

export function closeModalAction(type) {
  return {
    type,
    payload: {
      open: false
    }
  }
}