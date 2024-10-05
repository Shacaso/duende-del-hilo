export function ModalTitle({ children }: { children: string }) {
  return (
    <div className=' pb-4'>
      <h3 className='flex-1 p-2 gap-2 text-xl border-b-2 font-bold text-secondary text-center border-slate-200'>
        {children}
      </h3>
    </div>
  );
}
