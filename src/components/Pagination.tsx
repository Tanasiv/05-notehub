interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: Props) {
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
      {Array.from({ length: pageCount }, (_, i) => {
        const page = i + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              padding: '6px 10px',
              border: '1px solid #ccc',
              background: page === currentPage ? '#000' : '#fff',
              color: page === currentPage ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}